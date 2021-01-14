import React, {Component} from 'react';
import {Container} from "reactstrap";
import Item from "../../Order/Items/Item/item";
import Button from "../../buttons/grab-offer/grab-btn";
import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import RecipeOrder from "../Order/RecipeOrder";

function RecipeOrders(props) {

    return (
        <div className="Items">
            <p className="ItemsHead">Add Order</p>
            <Container>
                {props.data.map(element =>
                    <RecipeOrder order={element}/>
                )}
            </Container>
        </div>
    );
}

export default RecipeOrders;
