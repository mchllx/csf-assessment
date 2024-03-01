package vttp.batch4.csf.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.repositories.PurchaseOrderRepository;
import vttp.batch4.csf.exceptions.PurchaseOrderException;

@Service
public class PurchaseOrderService {

  @Autowired
  private PurchaseOrderRepository poRepo;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional(rollbackFor=PurchaseOrderException.class)
  public boolean createNewPurchaseOrder(Order order)  throws PurchaseOrderException {
    // TODO Task 3

    if (poRepo.create(order) == false) {
      System.out.println(">>>unsuccessful");
      throw new PurchaseOrderException("invalid request");
    }
      System.out.println(">>>successfully inserted");
      return poRepo.create(order);
  
  }
}
