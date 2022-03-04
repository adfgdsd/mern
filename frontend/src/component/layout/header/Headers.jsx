import React from 'react';
import { useNavigate,NavLink} from 'react-router-dom';

const Headers = () => {

    const pust = useNavigate();
    const search = (e)=>{
        e.preventDefault();
        const serch = document.querySelector("#serch");
        const value = serch.value;
        if(value){
            pust(`products/${value}`);
        }else{
            pust(`products`);
        }
        // console.log(value);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav_min">
                <a className="navbar-brand logo" href="#">ShopInF</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link aS" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link aS" to="/products">Product</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link aS" to="/cart">Cart</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link aS" to="/user">User</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input id='serch' className="form-control mr-sm-2" type="search" placeholder="Search a product name " aria-label="Search"/>
                            <button onClick={search} className="btn btn-outline-danger my-2 my-sm-0 ml-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
};

export default Headers;
