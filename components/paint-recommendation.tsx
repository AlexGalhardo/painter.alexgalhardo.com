"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaintStore } from "@/store/paint-store";
import { AlertCircle, Paintbrush, ShoppingCart } from "lucide-react";
import { useMemo } from "react";

export const formatArea = (area: number): string => {
	return area.toLocaleString("en-US", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	});
};

export function PaintRecommendation() {
	const walls = usePaintStore((state) => state.walls);

	const { hasErrors, totalPaintableArea, paintCans } = useMemo(() => {
		const hasErrors = walls.some((wall) => wall.errors.length > 0);

		const totalPaintableArea = walls
			.filter((wall) => wall.errors.length === 0)
			.reduce((total, wall) => total + wall.paintableArea, 0);

		const calculatePaintCans = () => {
			if (totalPaintableArea === 0 || hasErrors) {
				return { large: 0, medium: 0, standard: 0, small: 0 };
			}

			const coverage = {
				large: 18 * 50000,
				medium: 3.6 * 50000,
				standard: 2.5 * 50000,
				small: 0.5 * 50000,
			};

			let remainingArea = totalPaintableArea;
			const cans = { large: 0, medium: 0, standard: 0, small: 0 };

			const canTypes = [
				{ key: "large" as const, coverage: coverage.large },
				{ key: "medium" as const, coverage: coverage.medium },
				{ key: "standard" as const, coverage: coverage.standard },
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
		};

		return {
			hasErrors,
			totalPaintableArea,
			paintCans: calculatePaintCans(),
		};
	}, [walls]);

	const paintCanTypes = [
		{ key: "large" as const, name: "18 Liters", liters: 18, color: "bg-blue-600" },
		{ key: "medium" as const, name: "3.6 Liters", liters: 3.6, color: "bg-green-600" },
		{ key: "standard" as const, name: "2.5 Liters", liters: 2.5, color: "bg-yellow-600" },
		{ key: "small" as const, name: "0.5 Liters", liters: 0.5, color: "bg-red-600" },
	];

	if (hasErrors) {
		return (
			<Card>
				<CardContent className="pt-6">
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>
							Fix the errors on the walls before viewing paint recommendations.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	if (totalPaintableArea === 0) {
		return (
			<Card>
				<CardContent className="pt-6">
					<Alert>
						<Paintbrush className="h-4 w-4" />
						<AlertDescription>
							Enter wall dimensions to calculate the required amount of paint.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	const totalCans = Object.values(paintCans).reduce((sum, count) => sum + count, 0);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Paintbrush className="h-5 w-5 text-blue-600" />
						Project Summary
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="text-center p-4 bg-blue-50 rounded-lg">
							<div className="text-2xl font-bold text-blue-600">{formatArea(totalPaintableArea)} m²</div>
							<div className="text-sm text-gray-600">Total area to paint</div>
						</div>
						<div className="text-center p-4 bg-green-50 rounded-lg">
							<div className="text-2xl font-bold text-green-600">{totalCans}</div>
							<div className="text-sm text-gray-600">
								{totalCans === 1 ? "Can needed" : "Cans needed"}
							</div>
						</div>
						<div className="text-center p-4 bg-purple-50 rounded-lg">
							<div className="text-2xl font-bold text-purple-600">
								{(totalPaintableArea / 50).toFixed(1)}L
							</div>
							<div className="text-sm text-gray-600">Paint required</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ShoppingCart className="h-5 w-5 text-green-600" />
						Recommended Cans
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{paintCanTypes.map((type) => {
							const count = paintCans[type.key];
							return (
								<div
									key={type.key}
									className={`p-4 rounded-lg border-2 transition-all ${
										count > 0 ? "border-gray-300 bg-white shadow-md" : "border-gray-100 bg-gray-50"
									}`}
								>
									<div className="text-center">
										<div
											className={`w-12 h-12 mx-auto mb-3 rounded-full ${type.color} flex items-center justify-center`}
										>
											<Paintbrush className="h-6 w-6 text-white" />
										</div>
										<h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
										<div className="text-2xl font-bold mb-2">
											{count > 0 ? (
												<Badge variant="default" className="text-lg px-3 py-1">
													{count}
												</Badge>
											) : (
												<Badge variant="secondary" className="text-lg px-3 py-1">
													0
												</Badge>
											)}
										</div>
										<div className="text-sm text-gray-600">{count === 1 ? "can" : "cans"}</div>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
