self.onmessage = function(event) {
    const { stars, mousePosition, windowDimensions } = event.data;
    const scaleConstant = 5000;
    const starElements = stars.map((star: { top: number; left: number; scale: number }) => {
        const starPositionX = windowDimensions.width * star.left / 100;
        const starPositionY = windowDimensions.height * star.top / 100;
        const dx = starPositionX - (mousePosition.x || 0);
        const dy = starPositionY - (mousePosition.y || 0);
        const distanceSquared = mousePosition.x && mousePosition.y ? dx * dx + dy * dy : 1;
        const scale = distanceSquared > 0 ? Math.min(5, scaleConstant / distanceSquared + 1) :  (1 + Math.random());
        return { scale, top: star.top, left: star.left };
    });
    self.postMessage(starElements);
};

export {};
