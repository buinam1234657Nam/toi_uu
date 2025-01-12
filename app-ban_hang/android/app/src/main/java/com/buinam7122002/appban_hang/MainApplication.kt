  package com.buinam7122002.appban_hang; // Thay bằng package name của bạn

  import okhttp3.OkHttpClient;
  import javax.net.ssl.*;
  import java.security.cert.CertificateException;
  import java.security.cert.X509Certificate;
  public class OkHttpClientProvider {
      public static OkHttpClient.Builder getUnsafeOkHttpClient() {
          try {
              // Create a trust manager that does not validate certificate chains
              final TrustManager[] trustAllCerts = new TrustManager[] {
                  new X509TrustManager() {
                      @Override
                      public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                      }

                      @Override
                      public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                      }

                      @Override
                      public X509Certificate[] getAcceptedIssuers() {
                      return new X509Certificate[]{};
                      }
                  }
              };

              // Install the all-trusting trust manager
              final SSLContext sslContext = SSLContext.getInstance("SSL");
              sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

              // Create an ssl socket factory with our all-trusting manager
              final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

              OkHttpClient.Builder builder = new OkHttpClient.Builder();
              builder.sslSocketFactory(sslSocketFactory, (X509TrustManager)trustAllCerts[0]);
              builder.hostnameVerifier(new HostnameVerifier() {
                  @Override
                  public boolean verify(String hostname, SSLSession session) {
                      return true;
                  }
              });
              return builder;
          } catch (Exception e) {
              throw new RuntimeException(e);
          }
      }
  }