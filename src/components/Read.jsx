import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [radioData, setRadioData] = useState('');

    const { users, loading, searchData } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(showUser())
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <>
            {showPopup && <CustomModal id={id} setShowPopup={setShowPopup} />}
            {users.length > 0 ? <h2>All data</h2> : <h2>No data found</h2>}
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            name="gender"
                            checked={radioData === ''}
                            type="radio"
                            onChange={() => setRadioData("")}
                        />
                        All
                    </label>
                </div>
                <div className="col-auto">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            name="gender"
                            checked={radioData === "Male"}
                            value="Male"
                            type="radio"
                            onChange={(e) => setRadioData(e.target.value)}
                        />
                        Male
                    </label>
                </div>
                <div className="col-auto">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Female"
                            checked={radioData === "Female"}
                            type="radio"
                            onChange={(e) => setRadioData(e.target.value)}
                        />
                        Female
                    </label>
                </div>
            </div>
            {
                users &&
                users.filter((ele) => {
                    if (searchData.length > 0) {
                        return ele.name.toLowerCase().includes(searchData.toLowerCase());
                    }
                    return ele
                }).filter((ele) => {
                    if (radioData === "Male") {
                        return ele.gender == radioData
                    } else if (radioData === "Female") {
                        return ele.gender == radioData
                    }
                    return ele
                })
                    .map((ele) => (
                        <div key={ele.id} className="card w-50 mx-auto my-2">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                                <p className="card-text">{ele.gender}</p>
                                <button
                                    className="card-link"
                                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                                >
                                    View
                                </button>
                                <Link to={`/edit/${ele.id}`} className="card-link">
                                    Edit
                                </Link>
                                <Link
                                    onClick={() => dispatch(deleteUser(ele.id))}
                                    className="card-link"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}

export default Read