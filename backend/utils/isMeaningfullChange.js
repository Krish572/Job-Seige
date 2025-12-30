const isMeaningfullChange = (current) => {
    const last = current.ai_context.last_ai_snapshot;
    console.log(last);
    if (!last) return true;

    return (
        Math.abs(current.total_applied - last.total_applied) >= 2 ||
        Math.abs(current.total_interviews - last.total_interviews) >= 2 ||
        Math.abs(current.offers_received - last.offers_received) >= 1 ||
        Math.abs(current.total_rounds_attended - last.total_rounds_attended) >= 5 ||
        Math.abs(current.total_rounds_cleared - last.total_rounds_cleared) >= 3
    );
}

module.exports = isMeaningfullChange;