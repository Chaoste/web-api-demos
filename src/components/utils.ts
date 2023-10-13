export const applyDirection = (
  rotations: [number, number, number],
  command: string
): [number, number, number] => {
  const direction = command.toLowerCase();
  if (direction.includes("left")) {
    return [rotations[0], rotations[1] - 90, rotations[2]];
  }
  if (direction.includes("right")) {
    return [rotations[0], rotations[1] + 90, rotations[2]];
  }
  if (direction.includes("up")) {
    return [rotations[0] + 90, rotations[1], rotations[2]];
  }
  if (direction.includes("down")) {
    return [rotations[0] - 90, rotations[1], rotations[2]];
  }
  if (direction.includes("flip")) {
    return [rotations[0], rotations[1], rotations[2] - 90];
  }
  if (direction.includes("barrel" || direction.includes("flipendo"))) {
    return [rotations[0], rotations[1], rotations[2] + 360];
  }
  return rotations;
};