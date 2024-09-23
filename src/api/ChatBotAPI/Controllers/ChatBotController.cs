using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace ChatBotAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatbotController(IConfiguration configuration) : ControllerBase
    { 
        private  IConfiguration configuration = configuration;

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChatMessage message)
        {
       var client = new RestClient("https://api.wit.ai/message");
        var request = new RestRequest();
        string _witAiToken = configuration["WitToken"];// Replace with your Wit.ai server access token
        request.AddHeader("Authorization", $"Bearer {_witAiToken}");
        request.AddParameter("q", message.Text);

        var response = await client.ExecuteAsync<WitAiResponse>(request);
        System.Console.WriteLine(response.Content);
        var intent = response.Data.Intents?.FirstOrDefault()?.Name;
        System.Console.WriteLine("intent is " + intent);
        var entities = response.Data.Entities;
        var traits = response.Data.Traits;

        // Handle the intent, entities, and traits
        string reply;
        switch (intent)
        {
            case "wit_greet":
                reply = "Hello! How can I help you today?";
                break;
            case "get_weather":
                var location = entities?.Location?.FirstOrDefault()?.Value;
                reply = $"Sure, I can help with the weather in {location}.";
                break;
            default:
                reply = "I'm sorry, I didn't understand that.";
                break;
        }

        return Ok(new { reply });
        }
    }

  public class ChatMessage
{
    public string Text { get; set; }
}

public class WitAiResponse
{
    public string Text { get; set; }

        public WitAiIntent[] Intents { get; set; }
    public WitAiEntities Entities { get; set; }
    public WitAiTraits Traits { get; set; }
}

public class WitAiEntities
{
    public WitAiEntity[] Location { get; set; }
}

public class WitAiIntent
{
     public string Name { get; set; }
        public double Confidence { get; set; }
}

public class WitAiEntity
{
    public string Value { get; set; }
}

public class WitAiTraits
{
    // Define traits based on your Wit.ai model
    // For example, if you have a "temperature" trait, you can define it here
    // public WitAiTemperature[] Temperature { get; set; }
    
}
}