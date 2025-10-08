import path from "path";

const keyPath = path.resolve(
  __dirname,
  '../visionapi/crucial-raceway-459108-k2-efcf8535a54d.json'
);



import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath,
});

export const analyzeImage = async (filePath: string): Promise<string> => {
  try {
    const [result] = await client.labelDetection(filePath);
    const labels = result.labelAnnotations;
    if (!labels || labels.length === 0) {
      return 'No significant features detected in the image.';
    }
    const descriptions = labels.map(label => label.description).join(', ');
    return `🖼️ AI analyzed image and detected: ${descriptions}.`;
  } catch (error) {
    console.error('Error analyzing image:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Image analysis failed');
  }
};
