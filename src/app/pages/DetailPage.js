import { useParams } from "react-router";
import { BaseLayout } from '../layouts';
import { useFetch } from "../hooks/";
import { DetailPageContent } from '../components/project/' 
import { Loading } from '../components/layout';


const DetailPage = () => {
  const { id } = useParams();
  const MOVIE_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&append_to_response=video`
  const { data, isLoading } = useFetch(MOVIE_API);
  return (
    
    <BaseLayout>
    { isLoading || !data ? <Loading/>  :
    

        <DetailPageContent type="movie" item={data} />
    }
    </BaseLayout>
  );
};
 export default DetailPage