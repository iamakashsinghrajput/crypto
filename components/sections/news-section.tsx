'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { fetchNewsData } from "@/lib/store/newsSlice";
import type { RootState } from "@/lib/store";

export function NewsSection() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    // Ensure that the dispatch is correctly typed
    const fetchData = async () => {
      await dispatch(fetchNewsData() as any); // Cast to 'any' if necessary, or define the correct type
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Crypto News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="space-y-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium hover:underline"
              >
                {article.title}
              </a>
              <p className="text-sm text-muted-foreground">{article.description}</p>
              <div className="text-xs text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}