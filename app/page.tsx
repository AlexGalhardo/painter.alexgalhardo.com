"use client";

import { PaintCalculator } from "@/components/paint-calculator";
import { Github } from "lucide-react";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Galhardo Painter Calculator</h1>

					<a
						href="https://github.com/alexgalhardo/painter.alexgalhardo.com"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center text-gray-900 hover:text-gray-600 transition-colors"
						aria-label="View source on GitHub"
					>
						<Github size={28} />
					</a>
				</div>

				<PaintCalculator />
			</div>
		</div>
	);
}
