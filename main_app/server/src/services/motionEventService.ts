import path from 'path';
import * as motionEventDao from '../dao/motionEventDao';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const keyPath = path.resolve(
  __dirname,
  '../visionapi/crucial-raceway-459108-k2-efcf8535a54d.json'
);

const client = new ImageAnnotatorClient({
  keyFilename: keyPath,
});

export interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox: [number, number][];
}

export const createMotionEventService = async (
  photoBuffer: Buffer,
  timestamp?: string
): Promise<{ detectedObjects: DetectedObject[] }> => {
  // Parse timestamp or use current time
  let parsedTimestamp: Date;
  if (timestamp) {
    parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      throw new Error(
        'Invalid timestamp format. Use ISO format (e.g., 2025-05-05T10:00:00.000Z)'
      );
    }
  } else {
    parsedTimestamp = new Date();
  }

  if (!client.objectLocalization) {
    throw new Error('Object localization method not available');
  }

  const [result] = await client.objectLocalization({
    image: { content: photoBuffer }
  });

  if (!result.localizedObjectAnnotations) {
    throw new Error('No object annotations found');
  }

  const detectedObjects: DetectedObject[] = result.localizedObjectAnnotations.map(
    (object) => ({
      label: object.name ?? '',
      confidence: object.score ?? 0,
      boundingBox:
        object.boundingPoly?.normalizedVertices?.map((v) => [v.x ?? 0, v.y ?? 0]) ?? [],
    })
  );

  const newEvent = await motionEventDao.createMotionEventRecord({
    timestamp: parsedTimestamp,
    photo: photoBuffer,
    detectedObjects,
  });

  return { detectedObjects };
};

export const getAllMotionEventsService = async () => {
  const events = await motionEventDao.findAllMotionEvents();

  return events.map((event) => ({
    _id: event._id,
    timestamp: event.timestamp.toISOString(),
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    photo: event.photo,
    detectedObjects: event.detectedObjects,
  }));
};
