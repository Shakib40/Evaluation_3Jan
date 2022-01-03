import {useState,useRef , useEffect} from "react";
import "./Left.css"

const Form = () => {
    const [foods, setFoods] = useState(null);

    const [details, setDetails] = useState(null);

    const [form , setForm] = useState({
        title : "",
        ingredients : "",
        timetocook :"",
        images : "",
        instructions: "",
    });

    const handleChange = (e) => {
     const {name, value} = e.target;
   
     setForm({
        ...form,
         [name] : value,
     });

    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(form);      
      
      const payload = {
        title: form.title,
        ingredients: form.ingredients,
        timetocook: form.timetocook,
        images: form.images,
        instructions: form.instructions,
        status: false,
      };

        fetch("http://localhost:3001/foods", {
            method : "POST",
            body:JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        })

        .then(()=> {
            
            getData();
        });

    }

    
    
      // + adding the use
    useEffect(() => {
        
        getData();
    }, []);

    async function getData() {
        const response = await fetch("http://localhost:3001/foods");
        const data = await response.json();

        setFoods(data) ;
    }
    
    

    async function showDetails(id) {
        const response = await fetch(`http://localhost:3001/foods/${id}`);
        const data = await response.json();
        console.log(data);
        setDetails(data);
    }
    
    async function lowToHigh(){

        foods.sort(function(a,b){
            return b.id - a.id;
            }
        );
    }
    async function HighToLow() {

        foods.sort(function(a,b){
            return a.id - b.id;
            }
        );
    }
  
    return(
        <section >
        
        <div className = "section">

        <div className="left-container">    
        <form onSubmit={handleSubmit}>

            <input onChange={handleChange} name="title" type="text" placeholder = "Title" /><br/>
            <input onChange={handleChange} name="ingredients" type="text" placeholder = "Ingredients" /><br/> 
            <input onChange={handleChange} name="timetocook" type="text" placeholder = "Time to Cook" /><br/>
            <input onChange={handleChange} name="images" type="text" placeholder = "Image URLS" /><br/>
            <input onChange={handleChange} name="instructions" type="text" placeholder = "Instruction to Cook" /><br/>

            <input value = "submit" type="submit"/>

        </form>
        </div>
        
        <div className ="right-container">
        
        <select>Sort by time:
            <option >Sorting</option>
            <option onClick={lowToHigh}>Time Low to High</option>
            <option onClick={HighToLow}>Time High to Low</option>
        </select>
        
        {foods && (
        <table id="recipe">
            {foods.map((food, index) => (
              <tr key={index} onClick={() => { 
                  showDetails(food.id);

                  }}>
                  <td>{food.title}</td>
                  <td>{food.timetocook}</td>
              </tr>
            ))}
        </table>
        )}
        
          
        </div>

        </div>
        

        <div className ="details" onChange={showDetails}>
{/*         
        {details &&(
         <div>
         {details.map((details ,index) =>(
          <p>{details.id}</p> 
          ))}
         </div>
        )} */}
        
             
        </div>
         

        <div className ="list">
        
        <table>

        <thead>
            <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Time to cook</th>
            <th>Instructions</th>
            <th>Images</th>
            </tr>
        </thead>

        {foods && (
        <tbody>
            {foods.map((food, index) => (
              <tr key={index}>
                  <td>{food.id}</td>
                  <td>{food.title}</td>
                  <td>{food.ingredients}</td>
                  <td>{food.timetocook}</td>
                  <td>{food.instructions}</td>
                  <td><img src={food.images} alt="Food lists image"></img></td>

              </tr>
            ))}
        </tbody>
        )}

        </table>
        </div>

        </section>
    )
}

export default Form;