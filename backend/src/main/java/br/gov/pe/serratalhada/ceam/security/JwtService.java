package br.gov.pe.serratalhada.ceam.security;

import br.gov.pe.serratalhada.ceam.domain.entity.Usuario;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final JwtEncoder encoder;
    private final long expMinutos;

    public JwtService(JwtEncoder encoder,
                      @Value("${app.jwt.expiration-minutes:60}") long expMinutos) {
        this.encoder = encoder;
        this.expMinutos = expMinutos;
    }

    public String gerar(Usuario u) {
        Instant agora = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("ceam-backend")
                .issuedAt(agora)
                .expiresAt(agora.plus(expMinutos, ChronoUnit.MINUTES))
                .subject(u.getId().toString())
                .claim("email", u.getEmail())
                .claim("roles", List.of(u.roleSimples()))
                .build();
        var header = JwsHeader.with(MacAlgorithm.HS256).build();
        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
