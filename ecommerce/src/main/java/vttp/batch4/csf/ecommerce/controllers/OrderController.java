package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;
import vttp.batch4.csf.exceptions.PurchaseOrderException;

@Controller
@CrossOrigin(origins={"http://localhost:4200", "https://vttpb4-michelle-lim.up.railway.app", "http://localhost:8080"})
@RequestMapping(path="/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path="/order")
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) throws PurchaseOrderException{
        // TODO Task 3

      System.out.println("payload" + payload);

        JsonReader jr = Json.createReader(new StringReader(payload));
        JsonObject jsonObj = jr.readObject().getJsonObject("order");

        System.out.println("json" + jsonObj.toString());

        // String id = UUID.randomUUID().toString().substring(0,8);

        // orderid, date, name, address, priority, comments, cart 
    
        String name = jsonObj.getString("name");
        String address = jsonObj.getString("address");
        boolean priority = jsonObj.getBoolean("priority");
        String comments = jsonObj.getString("comments");

         // cart: lineItems: [{}]
        JsonObject cart = jsonObj.getJsonObject("cart");
        System.out.println("cart" + cart.toString());


        Order order = new Order();

        System.out.println(">>> check orderId" + order.getOrderId());

        order.setDate(new Date());
        order.setName(name);
        order.setAddress(address);
        order.setPriority(priority);
        order.setComments(comments);
        order.setCart(new Cart());

      if (poSvc.createNewPurchaseOrder(order) == false) {

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder()
          .add("message:", "order already exists");

        JsonObject error = jsonObjBuilder.build();

        // BAD REQUEST = 400
        return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_JSON)
        .body(error.toString());
      }

      JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder()
          .add("id:", order.getOrderId());
          // .add("name:", order.getName())
          // .add("address:", order.getAddress())
          // .add("priority:", order.getPriority())
          // .add("comments:", order.getComments())
          // .add("cart:", order.getCart().toString());

        JsonObject success = jsonObjBuilder.build();
    
      // OK = 200
      return ResponseEntity
      .status(HttpStatus.OK)
      .contentType(MediaType.APPLICATION_JSON)
      .body(success.toString());
  }
}
