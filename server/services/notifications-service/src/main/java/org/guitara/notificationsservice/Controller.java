package org.guitara.notificationsservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

  @GetMapping("/v1/notifications")
  public String getNotifications() {
    // This is a placeholder for the actual implementation
    return "List of notifications";
  }
}
