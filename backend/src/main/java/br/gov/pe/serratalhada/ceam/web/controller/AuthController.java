package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.domain.entity.Usuario;
import br.gov.pe.serratalhada.ceam.security.JwtService;
import br.gov.pe.serratalhada.ceam.web.dto.LoginRequest;
import br.gov.pe.serratalhada.ceam.web.dto.TokenResponse;
import br.gov.pe.serratalhada.ceam.web.dto.UsuarioResponse;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authManager, JwtService jwtService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req) {
        try {
            var auth = authManager.authenticate(
                    UsernamePasswordAuthenticationToken.unauthenticated(req.email().trim(), req.senha()));
            Usuario u = (Usuario) auth.getPrincipal();
            var usuario = new UsuarioResponse(u.getId(), u.getNome(), u.getEmail(),
                    u.getRole(), u.getCargo(), u.getTelefone(), u.getAtivo());
            return ResponseEntity.ok(new TokenResponse(jwtService.gerar(u), "Bearer", usuario));
        } catch (AuthenticationException e) {
            // mensagem única: não revela se o e-mail existe
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "E-mail ou senha inválidos"));
        }
    }
}
