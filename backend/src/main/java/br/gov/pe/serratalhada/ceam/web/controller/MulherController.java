package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.domain.entity.Mulher;
import br.gov.pe.serratalhada.ceam.service.MulherService;
import br.gov.pe.serratalhada.ceam.web.dto.MulherRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/mulheres")
public class MulherController {

    private final MulherService mulherService;

    public MulherController(MulherService mulherService) {
        this.mulherService = mulherService;
    }

    @PostMapping
    public ResponseEntity<Mulher> cadastrar(@RequestBody @Valid MulherRequest request) {
        Mulher mulherSalva = mulherService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mulherSalva);
    }

    @GetMapping
    public ResponseEntity<List<Mulher>> listar() {
        return ResponseEntity.ok(mulherService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mulher> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(mulherService.buscarPorId(id));
    }
}
