package tpms.backend_middleware.controllers;

import java.nio.charset.StandardCharsets;

import org.apache.commons.io.input.ReversedLinesFileReader;
import org.apache.commons.io.input.ReversedLinesFileReader.Builder;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/v1/logs", produces = "application/json")
@CrossOrigin("*")
public class LogsController {
    @GetMapping
    public String index() throws IOException {
        File file = new File("logs/standard.log");
        Builder builder = new ReversedLinesFileReader.Builder().setFile(file).setCharset(StandardCharsets.UTF_8);
        ReversedLinesFileReader reader = builder.get();
        var result = reader.toString(200);
        reader.close();
        return result;
    }

    @GetMapping("/incoming")
    public String incoming() throws IOException {
        File file = new File("logs/incoming.log");
        Builder builder = new ReversedLinesFileReader.Builder().setFile(file).setCharset(StandardCharsets.UTF_8);
        ReversedLinesFileReader reader = builder.get();
        var result = reader.toString(200);
        reader.close();
        return result;

    }
}
