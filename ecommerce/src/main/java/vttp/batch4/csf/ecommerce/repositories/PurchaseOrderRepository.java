package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.exceptions.PurchaseOrderException;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public boolean create(Order order) throws PurchaseOrderException {

    // insert into purchase_order(id, date, name, address, priority, comments, cart)
    //     values (?, ?, ?, ?, ?, ?, ?)
    //     """;

    // TODO Task 3
    return template.update(SQLQueries.SQL_INSERT_ORDER
        , order.getOrderId()
        , order.getDate()
        , order.getName()
        , order.getAddress()
        , order.getPriority()
        , order.getComments()
        , order.getCart().toString()
        ) > 0;
  }
}
