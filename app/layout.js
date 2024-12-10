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
		title: "Santa's Wishlist - Make Your Christmas Wishes Come True!",
		description: "Create your magical Christmas wishlist, write a special letter to Santa, and receive a personal reply from the North Pole! Parents can easily keep track of their children's Christmas dreams in one magical place.",
	}),
	metadataBase: new URL('https://santaswishlist.app'),
	openGraph: {
		title: "Santa's Wishlist - Make Your Christmas Wishes Come True!",
		description: "Create your magical Christmas wishlist, write a special letter to Santa, and receive a personal reply from the North Pole!",
		url: 'https://santaswishlist.app',
		siteName: "Santa's Wishlist",
		images: [
			{
				url: '/twitter-image.png',
				width: 1200,
				height: 630,
				alt: "Santa's Wishlist - Christmas Wishlist Creator",
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: "Santa's Wishlist - Make Your Christmas Wishes Come True!",
		description: "Create your magical Christmas wishlist, write a special letter to Santa, and receive a personal reply from the North Pole!",
		images: ['/twitter-image.png'],
		creator: '@santaswishlist',
	},
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
