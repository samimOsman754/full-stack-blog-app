import { IArticle } from "@/models/Article";
import { SeparatedArticles } from "./data";


export function separateArticlesBySection (allArticles: IArticle[]) {
    const separated: SeparatedArticles = {
        editorPickPrimary: {} as IArticle,
        editorPickSecondary: [],
        sliderArticles: [],
        mostRecentArticles: [],
        allMostRecentGridArticles: [],
        trendingArticles: [],
        gridArticles: [],
        popularArticles: []

    }
    separated.editorPickPrimary = allArticles.find((article) => article.meta.displaySection === 'editorPickPrimary') as IArticle;
    separated.editorPickSecondary = allArticles.filter((article) => article.meta.displaySection === 'editorPickSecondary')
    separated.sliderArticles = allArticles.filter((article) => article.meta.displaySection === 'slider')
    separated.mostRecentArticles = allArticles.filter((article) => article.meta.displaySection === 'mostRecent')
    separated.allMostRecentGridArticles = allArticles.filter((article) => article.meta.displaySection === 'mostRecentGrid')
    separated.trendingArticles = allArticles.filter((article) => article.meta.displaySection === 'trending')
    separated.gridArticles = allArticles.filter((article) => article.meta.displaySection === 'gridAndAds')
    separated.popularArticles = separated.trendingArticles;
    return separated;


}