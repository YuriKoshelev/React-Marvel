import { Helmet } from "react-helmet";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBondary from "../errorBoundary/ErrorBondary";

const ComicsPage = (props) => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <ErrorBondary>
                <AppBanner/>
                <ComicsList states={props.states}/>
            </ErrorBondary>
        </>
    )
}

export default ComicsPage