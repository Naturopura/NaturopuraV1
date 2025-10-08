import Purchase from '../models/Purchase';

// Runs every 5 minutes
setInterval(async () => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  try {
    const result = await Purchase.updateMany(
      { status: 'pending', createdAt: { $lte: thirtyMinutesAgo } },
      { $set: { status: 'completed' } }
    );
    if (result.modifiedCount > 0) {
      console.log(`[AutoConfirm] Marked ${result.modifiedCount} purchases as completed.`);
    }
  } catch (err) {
    console.error('[AutoConfirm] Error auto-confirming purchases:', err);
  }
}, 5 * 60 * 1000);