const shouldTriggerAI = (current, newPatternHash) => {
  const lastHash = current.ai_context?.last_ai_snapshot?.pattern_hash;
  if (!lastHash) return true;
  return lastHash !== newPatternHash;
};

module.exports = shouldTriggerAI;