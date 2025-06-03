"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePaintStore } from "@/store/paint-store";
import type { Wall } from "@/types/paint";
import { AlertTriangle, Calculator } from "lucide-react";
import { formatArea } from "./paint-recommendation";

interface WallInputCardProps {
	wallIndex: number;
	wall: Wall;
}

export function WallInputCard({ wallIndex, wall }: WallInputCardProps) {
	const updateWall = usePaintStore((state) => state.updateWall);

	const handleInputChange = (field: keyof Wall, value: number) => {
		updateWall(wallIndex, { [field]: value });
	};

	const wallNumber = wallIndex + 1;

	return (
		<Card className="h-fit">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2 text-lg">
					<Calculator className="h-5 w-5 text-blue-600" />
					Wall {wallNumber}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor={`width-${wallIndex}`} className="text-sm font-medium">
							Width (cm)
						</Label>
						<Input
							id={`width-${wallIndex}`}
							type="number"
							min="0"
							value={wall.width || ""}
							onChange={(e) => handleInputChange("width", Number(e.target.value) || 0)}
							className="text-center"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor={`height-${wallIndex}`} className="text-sm font-medium">
							Height (cm)
						</Label>
						<Input
							id={`height-${wallIndex}`}
							type="number"
							min="0"
							value={wall.height || ""}
							onChange={(e) => handleInputChange("height", Number(e.target.value) || 0)}
							className="text-center"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor={`doors-${wallIndex}`} className="text-sm font-medium">
							Doors
						</Label>
						<Input
							id={`doors-${wallIndex}`}
							type="number"
							min="0"
							max="3"
							value={wall.doors || ""}
							onChange={(e) => handleInputChange("doors", Number(e.target.value) || 0)}
							className="text-center"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor={`windows-${wallIndex}`} className="text-sm font-medium">
							Windows
						</Label>
						<Input
							id={`windows-${wallIndex}`}
							type="number"
							min="0"
							max="3"
							value={wall.windows || ""}
							onChange={(e) => handleInputChange("windows", Number(e.target.value) || 0)}
							className="text-center"
						/>
					</div>
				</div>

				{wall.totalArea > 0 && (
					<div className="space-y-2 pt-2 border-t">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Total area:</span>
							<Badge variant="secondary">{formatArea(wall.totalArea)} m²</Badge>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Area to paint:</span>
							<Badge variant="default">{formatArea(wall.paintableArea)} m²</Badge>
						</div>
					</div>
				)}

				{wall.errors.length > 0 && (
					<div className="space-y-2">
						{wall.errors.map((error, index) => (
							<Alert key={index} variant="destructive" className="py-2">
								<AlertTriangle className="h-4 w-4" />
								<AlertDescription className="text-xs">{error}</AlertDescription>
							</Alert>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
