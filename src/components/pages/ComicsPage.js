import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBondary from "../errorBoundary/ErrorBondary";

const ComicsPage = () => {
    return (
        <>
            <ErrorBondary>
                <AppBanner/>
                <ComicsList/>
            </ErrorBondary>
        </>
    )
}

export default ComicsPage