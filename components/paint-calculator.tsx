"use client";

import { usePaintStore } from "@/store/paint-store";
import { PaintRecommendation } from "./paint-recommendation";
import { WallInputCard } from "./wall-input-card";

export function PaintCalculator() {
	const walls = usePaintStore((state) => state.walls);

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{walls.map((wall, index) => (
					<WallInputCard key={index} wallIndex={index} wall={wall} />
				))}
			</div>

			<PaintRecommendation />
		</div>
	);
}
