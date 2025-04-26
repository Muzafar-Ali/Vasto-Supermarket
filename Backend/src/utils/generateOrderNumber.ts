const generateOrderNumber = (() => {
  // 1. INITIALIZE ONCE (when server starts)
  const machineId = Math.floor(Math.random() * 90 + 10); // 10-99 (2 digits)
  let lastTimestamp = 0;
  let sequence = 0;

  // 2. THE ACTUAL GENERATOR
  return () => {
    const now = Date.now();
    
    // === MILLISECOND TRACKING LOGIC ===
    // Detect if this is a new millisecond compared to last call
    if (now !== lastTimestamp) {
      sequence = 0;          // Reset counter for new millisecond
      lastTimestamp = now;   // Update tracker to current ms
    }
    
    sequence++;
    
    // 3. BUILD COMPONENTS
    const datePart = new Date(now).toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
    const timePart = now.toString().slice(-6); // Last 6 digits of timestamp
    const seqPart = sequence.toString().padStart(2, '0'); // 2-digit zero-padded (01 → 99)
    
    return `ORD-${datePart}-${machineId}-${timePart}-${seqPart}`;
  };
})();

export default generateOrderNumber;