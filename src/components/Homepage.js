import React, {useState, useEffect} from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "../firebase.js";
import './homepage.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Homepage() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user){
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTasks([]);
                    const data = snapshot.val();
                    if (data !== null){
                        Object.values(data).map(task => {
                            setTasks((oldArray) => [...oldArray, task]);
                        })
                    }
            })
        }else if(!user){
                navigate('/');
            }
        });
    }, []);

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch(err => {alert(err.message);});
    };

    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
          task: task,
          uidd: uidd
        });
    
        setTask("");
      };

      const handleUpdate = (task) => {
        setIsEdit(true);
        setTask(task.task);
        setTempUidd(task.uidd)
      };

      const handleEditConfirm =() => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            task: task,
            tempUidd: tempUidd
        });
        setTask("");
        setIsEdit(false);
      }
    


      const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
      };


    return(
        <div className="homepage">
            <h1>ToDo List</h1>
            <input className="task-input" type="text" placeholder="Add a task" value={task} onChange={(e)=> setTask(e.target.value)}/>
            {tasks.map((task) => (
                <div className="task-container">
                    <h1>{task.task}</h1>
                    <EditIcon className="edit-icon " onClick = {() => handleUpdate(task)}/>
                    <DeleteIcon className="delete-icon" onClick = {() => handleDelete(task.uidd)}/>
                </div>
            ))
            }

            {isEdit ? (
                <div>
                    <EditIcon className="confirm-edit" onClick = {handleEditConfirm}/>
                </div>
            ) : (
                <div>
                    <AddIcon className="add-icon" onClick = {writeToDatabase} />
                </div>
            )
            }
            <button className="log-out-button" onClick={handleLogOut}>Logout</button>
        </div>
    )
}