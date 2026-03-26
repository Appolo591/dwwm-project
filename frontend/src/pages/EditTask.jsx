import { useParams } from 'react-router-dom';

const EditTask =()=> {
    const routeParams = useParams();
    console.log(routeParams);
// 5. Le rendu JSX
  return (
    <div>
      <h1>EditTaskPage</h1>
      <p>ID de la tâche : {routeParams.id}</p>
    </div>
  );
}
export default EditTask