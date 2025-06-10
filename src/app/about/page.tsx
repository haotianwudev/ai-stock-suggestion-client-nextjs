"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Star, Users, BookOpen, Code2, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const aiTools = [
    { name: "Deepseek", rating: 4, comment: "Free and handy. API is cheap." },
    { name: "Gemini", rating: 5, comment: "Online search are fast." },
    { name: "Gemini Deep Research", rating: 5, comment: "Super long but fantastic reports" },
    { name: "Gems", rating: 3, comment: "Handy to have a context to LLM." },
    { name: "Obsidian", rating: 3, comment: "Too complicated..." },
    { name: "Chatwise", rating: 4, comment: "Local LLM client with MCP integrated." },
    { name: "Cursor", rating: 5, comment: "Vibe coding~~" },
    { name: "Ollama", rating: 5, comment: "Local LLM" },
    { name: "Cline", rating: 3, comment: "Experience not as good as cursor." },
    { name: "Veo", rating: 3, comment: "I like the video made, but I do not know how to use it in finance topics." },
    { name: "VideoScribe", rating: 2, comment: "Too expensive. AI are not that smart." },
    { name: "NotebookLM", rating: 4, comment: "New way of learning." },
    { name: "Canvas", rating: 5, comment: "Knowledge -> Websites -> Knowledge" },
    { name: "Neon", rating: 5, comment: "Free PostgreSQL Database" },
    { name: "Vercel", rating: 4, comment: "Free Next.js deployment. GraphQL server is having issue." },
    { name: "Render", rating: 4, comment: "Free server is a joke. 7 dollar server is OK." },
    { name: "CapCut", rating: 4, comment: "I use the AI subtitle" },
    { name: "QuantConnect", rating: 2, comment: "Server disconnect all the time" },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-4xl font-bold">About the Creator</h1>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xl text-muted-foreground">
              Welcome to my personal journey into AI and finance
            </p>
          </div>

          {/* Introduction Card */}
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Welcome!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                I'm the creator of this site, but you can call me <strong>Sophie's Daddy</strong>. 
                My day job is on Wall Street, but I believe financial knowledge shouldn't be a luxury, 
                so I am right here with you.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
                <p className="text-center font-semibold text-purple-700 text-xl">
                  My motto is simple: <strong>If it's complicated, let's break it down.</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                My Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                This website is my personal learning journey into the fascinating world of AI and finance. 
                Together, we'll decode complex topics—from open-source projects and stock analysis to 
                machine learning and app development.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-6 py-3 text-xl font-semibold">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Personal Hobby
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-6 py-3 text-xl font-semibold">
                  Completely Free
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-6 py-3 text-xl font-semibold">
                  No Logins Required
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-6 py-3 text-xl font-semibold">
                  No Subscriptions
                </Badge>
              </div>
              <p className="italic text-muted-foreground">
                Just pure, accessible knowledge.
              </p>
            </CardContent>
          </Card>

          {/* Sophie Dedication Card */}
          <Card className="mb-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-red-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-600" />
                For Sophie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                More than anything, this website is a celebration of my newborn daughter, <strong>Sophie</strong>. 
                As she grows up in a world powered by AI, I wanted to create something that represents 
                the best of what technology can offer: the power to empower, educate, and connect us all.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border border-pink-200 text-center">
                <p className="text-pink-700 font-medium">
                  💕 A gift of knowledge for the next generation 💕
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <p className="text-xl font-semibold text-green-700">
                  I'm so glad you're here. Let's learn together.
                </p>
                <p className="text-lg text-green-600">
                  Please leave me a comment in any forms, so that I know you've been here.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Toolkit Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code2 className="h-6 w-6 text-indigo-600" />
                My AI Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">AI Tool Name</th>
                      <th className="text-center py-3 px-2 font-semibold">Rating</th>
                      <th className="text-left py-3 px-2 font-semibold">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiTools.map((tool, index) => (
                      <tr key={tool.name} className={`border-b ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                        <td className="py-3 px-2 font-medium">{tool.name}</td>
                        <td className="py-3 px-2 text-center">
                          <div className="flex justify-center gap-1">
                            {renderStars(tool.rating)}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">{tool.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Disclaimer />
    </div>
  );
} 