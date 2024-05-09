self.onmessage = function(event) {
    const { stars, mousePosition, windowDimensions } = event.data;
    const starElements = stars.map((star: { top: number; left: number; scale: number }) => {
        const starPosition = { x: windowDimensions.width * star.left / 100, y: windowDimensions.height * star.top / 100 };
        const distanceSquared = mousePosition.x && mousePosition.y ? Math.pow(starPosition.y - mousePosition.y, 2) + Math.pow(starPosition.x - mousePosition.x, 2) : 1;
        const scale = distanceSquared > 0 ? Math.min(3, 5000 / distanceSquared + 1) :  (1 + Math.random());
        return { scale, top: star.top, left: star.left };
    });
    self.postMessage(starElements);
};

export {};
