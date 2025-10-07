import FeatureSliderSection from "@/components/sections/home/FeatureSliderSection";
import GridAndAds from "@/components/sections/home/GridAndAds";
import HomeContentSection from "@/components/sections/home/HomeContentSection";
import MostRecentSection from "@/components/sections/home/MostRecentSection";
import { getHomePageData } from "@/lib/data";

export default async function Home() {
  const { articles } = await getHomePageData();

  const {
    editorPickPrimary,
    editorPickSecondary,
    trendingArticles,
    sliderArticles,
    gridArticles,
    mostRecentArticles,
    allMostRecentGridArticles,
    popularArticles,
  } = articles;

  return (
    <div className="blog-container">
      {editorPickPrimary &&
        editorPickSecondary.length > 0 &&
        trendingArticles.length > 0 && (
          <HomeContentSection
            editorPickPrimary={editorPickPrimary}
            editorPickSecondary={editorPickSecondary}
            trendingArticles={trendingArticles}
          />
        )}
      {sliderArticles.length > 0 && (
        <FeatureSliderSection articles={sliderArticles} />
      )}

      {gridArticles.length > 0 && <GridAndAds articles={gridArticles} />}

      {mostRecentArticles.length > 0 &&
        allMostRecentGridArticles.length > 0 &&
        popularArticles.length > 0 && (
          <MostRecentSection
            mostRecentArticles={mostRecentArticles}
            allMostRecentGridArticles={allMostRecentGridArticles}
            popularArticles={popularArticles}
          />
        )}
    </div>
  );
}
