import type { ValidationConstants, Wall } from "@/types/paint";

const CONSTANTS: ValidationConstants = {
	MIN_WALL_AREA: 10000, // 1 m² = 10,000 cm²
	MAX_WALL_AREA: 500000, // 50 m² = 500,000 cm²
	DOOR_AREA: 15200, // 1.9m × 0.8m = 1.52 m² = 15,200 cm²
	WINDOW_AREA: 24000, // 2m × 1.2m = 2.4 m² = 24,000 cm²
	DOOR_MIN_HEIGHT: 220, // 2.2m = 220cm (door height + margin)
	DOOR_MIN_WIDTH: 80, // 0.8m = 80cm
	WINDOW_MIN_HEIGHT: 120, // 1.2m = 120cm
	WINDOW_MIN_WIDTH: 200, // 2m = 200cm
};

export function validateWall(wall: Wall): string[] {
	const errors: string[] = [];
	const { width, height, doors, windows, totalArea } = wall;

	if (totalArea > 0 && totalArea < CONSTANTS.MIN_WALL_AREA) {
		errors.push("Parede deve ter pelo menos 1 m²");
	}

	if (totalArea > CONSTANTS.MAX_WALL_AREA) {
		errors.push("Parede não deve ter mais de 50 m²");
	}

	if (doors > 0) {
		if (height < CONSTANTS.DOOR_MIN_HEIGHT) {
			errors.push("Altura deve ser maior que 220cm para ter porta");
		}
		if (width < CONSTANTS.DOOR_MIN_WIDTH) {
			errors.push("Largura deve ser maior que 80cm para ter porta");
		}
	}

	if (windows > 0) {
		if (height < CONSTANTS.WINDOW_MIN_HEIGHT) {
			errors.push("Altura deve ser maior que 120cm para ter janela");
		}
		if (width < CONSTANTS.WINDOW_MIN_WIDTH) {
			errors.push("Largura deve ser maior que 200cm para ter janela");
		}
	}

	const doorsAndWindowsArea = doors * CONSTANTS.DOOR_AREA + windows * CONSTANTS.WINDOW_AREA;
	if (totalArea > 0 && doorsAndWindowsArea > totalArea * 0.5) {
		errors.push("Área de portas e janelas não pode ser maior que 50% da parede");
	}

	return errors;
}

export function calculatePaintableArea(wall: Wall): number {
	const { totalArea, doors, windows } = wall;
	const doorsArea = doors * CONSTANTS.DOOR_AREA;
	const windowsArea = windows * CONSTANTS.WINDOW_AREA;

	return Math.max(0, totalArea - doorsArea - windowsArea);
}
