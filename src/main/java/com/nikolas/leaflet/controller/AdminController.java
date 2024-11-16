package com.nikolas.leaflet.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/geo-admin")
    public String geoAdmin() {
        return "admin/geo-admin";
    }

}
