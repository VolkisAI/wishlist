import { Inter } from "next/font/google";
import "./globals.css";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	...getSEOTags({
		title: config.appName,
		description: config.appDescription,
	}),
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/icon.png', type: 'image/png' },
		],
		apple: [
			{ url: '/apple-icon.png', type: 'image/png' },
		],
		other: [
			{
				rel: 'apple-touch-icon',
				url: '/apple-icon.png',
			},
		],
	},
	manifest: '/manifest.json',
	appleWebApp: {
		title: config.appName,
		statusBarStyle: 'default',
		capable: true,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-icon.png" />
			</head>
			<body className={inter.className}>
				<NextTopLoader color={config.colors.main} />
				<Toaster position="bottom-center" />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
