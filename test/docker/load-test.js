import http from "k6/http";
import { check } from "k6";
import { Counter, Rate } from "k6/metrics";

export let errorCounter = new Counter("Error HTTP Counter");
export let errorRate = new Rate("Error HTTP Rate");

export let options = {
  hosts: { "middleware.fado.vn": "192.168.10.96" },
};

export default function () {
  const response = http.get(
    "http://middleware.fado.vn/v1.0/products/detail?publisher=fado&source=amazon&country_code=us&id=B00MPSJ0TW&has_related_keyword_list=1&has_related_product_list=1&has_data_encrypted=1"
  );

  const isSuccess = check(response, {
    "status is 200": (r) => r.status === 200,
  });

  errorCounter.add(!isSuccess);
  errorRate.add(!isSuccess);
}
