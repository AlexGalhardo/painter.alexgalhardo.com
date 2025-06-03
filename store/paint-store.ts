import { calculatePaintableArea, validateWall } from "@/lib/paint-calculations";
import type { PaintCans, Wall } from "@/types/paint";
import { create } from "zustand";

interface PaintStore {
	walls: Wall[];
	updateWall: (index: number, updates: Partial<Wall>) => void;
	getTotalPaintableArea: () => number;
	getPaintRecommendation: () => PaintCans;
	hasValidationErrors: () => boolean;
}

const initialWall: Wall = {
	width: 0,
	height: 0,
	doors: 0,
	windows: 0,
	totalArea: 0,
	paintableArea: 0,
	errors: [],
};

export const usePaintStore = create<PaintStore>((set, get) => ({
	walls: Array(4)
		.fill(null)
		.map(() => ({ ...initialWall })),

	updateWall: (index, updates) => {
		set((state) => {
			const newWalls = [...state.walls];
			const updatedWall = { ...newWalls[index], ...updates };

			updatedWall.totalArea = updatedWall.width * updatedWall.height;
			updatedWall.paintableArea = calculatePaintableArea(updatedWall);
			updatedWall.errors = validateWall(updatedWall);

			newWalls[index] = updatedWall;
			return { walls: newWalls };
		});
	},

	getTotalPaintableArea: () => {
		const { walls } = get();
		return walls.filter((wall) => wall.errors.length === 0).reduce((total, wall) => total + wall.paintableArea, 0);
	},

	getPaintRecommendation: () => {
		const totalArea = get().getTotalPaintableArea();

		if (totalArea === 0 || get().hasValidationErrors()) {
			return { large: 0, medium: 0, normal: 0, small: 0 };
		}

		const coverage = {
			large: 18 * 50000, // 18L = 900,000 cm²
			medium: 3.6 * 50000, // 3.6L = 180,000 cm²
			normal: 2.5 * 50000, // 2.5L = 125,000 cm²
			small: 0.5 * 50000, // 0.5L = 25,000 cm²
		};

		let remainingArea = totalArea;
		const cans: PaintCans = { large: 0, medium: 0, normal: 0, small: 0 };

		const canTypes = [
			{ key: "large" as const, coverage: coverage.large },
			{ key: "medium" as const, coverage: coverage.medium },
			{ key: "normal" as const, coverage: coverage.normal },
			{ key: "small" as const, coverage: coverage.small },
		];

		for (const canType of canTypes) {
			if (remainingArea <= 0) break;

			const neededCans = Math.floor(remainingArea / canType.coverage);
			if (neededCans > 0) {
				cans[canType.key] = neededCans;
				remainingArea -= neededCans * canType.coverage;
			}
		}

		if (remainingArea > 0) {
			cans.small += Math.ceil(remainingArea / coverage.small);
		}

		return cans;
	},

	hasValidationErrors: () => {
		const { walls } = get();
		return walls.some((wall) => wall.errors.length > 0);
	},
}));
