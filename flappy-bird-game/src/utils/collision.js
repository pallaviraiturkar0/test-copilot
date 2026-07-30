// Collision detection using AABB (Axis-Aligned Bounding Box)
export const checkCollision = (bird, pipe) => {
  const birdBox = {
    left: bird.x,
    right: bird.x + bird.width,
    top: bird.y,
    bottom: bird.y + bird.height
  };

  const topPipeBox = {
    left: pipe.x,
    right: pipe.x + pipe.width,
    top: 0,
    bottom: pipe.topHeight
  };

  const bottomPipeBox = {
    left: pipe.x,
    right: pipe.x + pipe.width,
    top: pipe.topHeight + pipe.gap,
    bottom: pipe.topHeight + pipe.gap + pipe.bottomHeight
  };

  // Check collision with top pipe
  if (
    birdBox.right > topPipeBox.left &&
    birdBox.left < topPipeBox.right &&
    birdBox.top < topPipeBox.bottom
  ) {
    return true;
  }

  // Check collision with bottom pipe
  if (
    birdBox.right > bottomPipeBox.left &&
    birdBox.left < bottomPipeBox.right &&
    birdBox.bottom > bottomPipeBox.top
  ) {
    return true;
  }

  return false;
};

// Check if bird is out of bounds
export const checkBoundary = (bird, gameHeight) => {
  return bird.y <= 0 || bird.y + bird.height >= gameHeight;
};
