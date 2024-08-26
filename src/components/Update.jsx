
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userDetailSlice";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [updateData, setUpdateData] = useState()

    const { users, loading } = useSelector(state => state.app)

    useEffect(() => {
        if (id) {
            const singleUser = users.filter(user => user.id === id)
            console.log('id', users)

            setUpdateData(singleUser[0])
        }
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newData = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    };
    const handleUpdate = (e) => {
        e.preventDefault();

        dispatch(updateUser(updateData))
        navigate('/read')
    }

    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <h2 className="my-2">Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={updateData && updateData.name}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={updateData && updateData.email}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control"
                        value={updateData && updateData.age}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Male"
                            type="radio"
                            checked={updateData && updateData.gender === "Male"}
                            onChange={newData}
                        />
                        Male
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-check-label">
                        <input
                            className="form-check-input"
                            name="gender"
                            value="Female"
                            type="radio"
                            checked={updateData && updateData.gender === "Female"}
                            onChange={newData}
                        />
                        Female
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Update