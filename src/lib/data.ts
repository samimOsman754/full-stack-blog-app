import ArticleModel, { IArticle } from "@/models/Article";
import { connectDB } from "./mongodb";
import { separateArticlesBySection } from "./articlesUtils";



export interface SeparatedArticles {
    editorPickPrimary: IArticle;
    editorPickSecondary: IArticle[];
    trendingArticles: IArticle[];
    sliderArticles: IArticle[];
    gridArticles: IArticle[];
    mostRecentArticles: IArticle[];
    allMostRecentGridArticles: IArticle[];
    popularArticles: IArticle[];
}


interface HomePageData {
    articles: SeparatedArticles;
}

export async function getHomePageData(): Promise<HomePageData> {
    let allFetchedArticles: IArticle[] = [];
    try {
        await connectDB();
        const articles = await ArticleModel.find({}).sort({ createdAt: -1 }).lean();
        allFetchedArticles = JSON.parse(JSON.stringify(articles));
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }

    const separatedArticles = separateArticlesBySection(allFetchedArticles);

    return {
        articles: separatedArticles
    }
}