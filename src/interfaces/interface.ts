export type Project = {
  id: string;
  projectTitle: string;
  projectDescription: string;
  projectThumbnail: string;
  websiteLink?: string | null;
  contactEmail: string;
  category: string;
  ownerId: string;
  githubRepository?: string  | null;
  tasks:[],
  moderators: string[];
  verificationMethod: number;
  socialMediaHandles?: string[]   | null;
  toolsAndTech?: string | null;
  socialMediaDetails?: string   | null;
  additionalInfo?: string  | null;
  mailSent?: string   | null;
  signedMessage?: string  | null;
  checksAgreed?: boolean  | null;
  owner:any
};

export type tiers =
| "UNRATED"
| "IRON"
| "BRONZE"
| "SILVER"
| "GOLD"
| "PLATINUM"
| "DIAMOND"
| "ASCENDANT"
| "IMMORTAL"
| "RADIANT";
;

export type userType =
| "Moderator"
| "Normal"
| "Owner"
| "RougeDevs-Core"
| "RougeDevs-Support";

export type Notification = {
id: number;
text: string;
link?: string;
};

export type Token = "BTC" | "ETH" | "DAI" | "USDC" | "USDT" | "STRK";

export type Contributor = {
name: string;
points: number;
rank: number;
tier: tiers;
profile: string;
profileIcon: string;
};

export type Task = {
title: string;
description: string;
difficultyLevel: string;
deadline: number;
};
