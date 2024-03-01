package vttp.batch4.csf.ecommerce.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Headers required for CORS
@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
 
            registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:4200"
                    ,"http://localhost:8080"
                    ,"https://vttpb4-michelle-lim.up.railway.app")
                .allowedMethods(
                    HttpMethod.GET.name(),
                    HttpMethod.POST.name(),
                    HttpMethod.PATCH.name(),
                    HttpMethod.DELETE.name())
                .allowedHeaders(
                    HttpHeaders.CONTENT_TYPE,
                    HttpHeaders.AUTHORIZATION);
            }
        };
    }
}