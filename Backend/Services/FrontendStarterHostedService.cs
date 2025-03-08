using System.Diagnostics;

namespace SocialMediaAPP.Services
{
    public class FrontendStarterHostedService : IHostedService
    {
        private Process? _frontendProcess;
        private readonly ILogger<FrontendStarterHostedService> _logger;
        private readonly string _frontendUrl = "http://localhost:5173";

        public FrontendStarterHostedService(ILogger<FrontendStarterHostedService> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                var backendDirectory = Directory.GetCurrentDirectory();
                var frontendDirectory = Path.GetFullPath(Path.Combine(backendDirectory, "../Frontend"));

                if (!Directory.Exists(frontendDirectory))
                {
                    _logger.LogError($"Frontend directory not found: {frontendDirectory}");
                    return Task.CompletedTask;
                }

                // Use cmd.exe to open a new command prompt window.
                // /k runs the command and then remains open.
                var startInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = "/k bun dev",
                    WorkingDirectory = frontendDirectory,
                    UseShellExecute = true,
                    CreateNoWindow = false,
                    WindowStyle = ProcessWindowStyle.Normal
                };

                _logger.LogInformation($"Launching frontend development server in a new command prompt at {frontendDirectory}.");
                _frontendProcess = Process.Start(startInfo);

                if (_frontendProcess == null)
                {
                    _logger.LogError("Failed to start the frontend process. Process.Start returned null.");
                }
                else
                {
                    // Run a background task to open the default browser after a short delay.
                    _ = Task.Run(async () =>
                    {
                        // Adjust the delay as needed to allow the frontend dev server to initialize.
                        await Task.Delay(3000, cancellationToken);

                        try
                        {
                            var psi = new ProcessStartInfo
                            {
                                FileName = _frontendUrl,
                                UseShellExecute = true
                            };
                            Process.Start(psi);
                            _logger.LogInformation($"Opened default browser to {_frontendUrl}");
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Failed to open default browser for the frontend.");
                        }
                    }, cancellationToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to start the frontend process in a new command prompt.");
            }

            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_frontendProcess != null && !_frontendProcess.HasExited)
            {
                try
                {
                    _logger.LogInformation("Stopping the frontend development server.");
                    _frontendProcess.Kill();
                    await _frontendProcess.WaitForExitAsync(cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while stopping the frontend process.");
                }
                finally
                {
                    _frontendProcess.Dispose();
                }
            }
        }
    }
}
