import React from "react"
import {
    Progress,
    Spinner
} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


const ProgressBar = () => {

 

    return (

        <div>
            <div class="bd-cheatsheet container-fluid bg-body col-md-6 offset-md-3 mx-auto" ><br /></div>
            <div className="text-center">
                <Spinner color="primary">

                </Spinner>
                <br />
                <p>Loading...</p>
            </div>
            <br />
            <Progress multi >

                <Progress

                    animated
                    bar
                    color="success"
                    value="30"
                >
                    Desenvolvimento em progresso.
                </Progress>

            </Progress>
        </div>
    )

}
export default ProgressBar