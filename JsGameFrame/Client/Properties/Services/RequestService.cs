using Idlebar.Client.Models;
using Idlebar.Shared;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Idlebar.Client.Services
{
    public class RequestService
    {
        private readonly BackendService Backend;

        public RequestService(BackendService backendService)
        {
            Backend = backendService;
        }

        public async Task<RequestResult<CodeReward>> LoadRewardAsync(Guid stateId, string rewardCode)
        {
            try
            {
                var loadResponse = await Backend.LoadCodeRewardAsync(rewardCode);
                if (!loadResponse.IsSuccessStatusCode)
                {
                    return loadResponse.StatusCode switch
                    {
                        HttpStatusCode.NotFound => RequestResult<CodeReward>.Failed("Unknown reward code!"),
                        _ => RequestResult<CodeReward>.Failed("Unknown error while loading Code-Reward!")
                    };
                }

                var usabilityResponse = await Backend.LoadRewardUsabilityAsync(stateId, loadResponse.Result.Id);
                if (!usabilityResponse.IsSuccessStatusCode)
                {
                    return usabilityResponse.StatusCode switch
                    {
                        _ => RequestResult<CodeReward>.Failed("Unknown error while loading Code-Reward-Usability"),
                    };
                }

                return usabilityResponse.Result
                    ? RequestResult<CodeReward>.Successful(loadResponse.Result)
                    : RequestResult<CodeReward>.Failed("You have already claimed that reward!");
            }
            catch (Exception ex)
            {
                return RequestResult<CodeReward>.Error(ex);
            }
        }

        public async Task<RequestResult<CreateAccountResult>> CreateGameAsync()
        {
            try
            {
                var response = await Backend.CreateAccountAsync();

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        _ => RequestResult<CreateAccountResult>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}")
                    })
                    : RequestResult<CreateAccountResult>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<CreateAccountResult>.Error(ex);
            }
        }

        public async Task<RequestResult<object>> UpdateAccountAsync(AccountInfo accountInfo)
        {
            try
            {
                var request = new UpdateAccountRequest(accountInfo);
                var response = await Backend.UpdateAccountAsync(request);

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        HttpStatusCode.NotFound => RequestResult<object>.Failed("Tried to update an invalid saveCode!\nPlease report that incident to the developers!"),
                        HttpStatusCode.BadRequest => RequestResult<object>.Failed("The server decided to reject your account update!\nIf you don't know why this might have happened contact the devs!"),
                        HttpStatusCode.Conflict => RequestResult<object>.Failed("The game is opened in another tab! Cannot override it..."),
                        _ => RequestResult<object>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}")
                    })
                    : RequestResult<object>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<object>.Error(ex);
            }
        }

        public async Task<RequestResult<LoadGameResult>> LoadGameAsync(string gameId)
        {
            try
            {
                var response = await Backend.LoadLatestStateAsync(gameId);

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        HttpStatusCode.NotFound => RequestResult<LoadGameResult>.Failed("Invalid Savecode!\nCheck your spelling!"),
                        _ => RequestResult<LoadGameResult>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}")
                    })
                    : RequestResult<LoadGameResult>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<LoadGameResult>.Error(ex);
            }
        }

        public async Task<RequestResult<UpdateGameResult>> UpdateGameAsync(Guid tabCode, SaveState saveState, RewardInfo[] usedRewards, QuestUpdate[] questUpdates)
        {
            try
            {
                var request = new UpdateStateRequest(tabCode, saveState, usedRewards, questUpdates);
                var response = await Backend.UpdateGameAsync(request);

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        HttpStatusCode.NotFound => RequestResult<UpdateGameResult>.Failed("Tried to update an invalid saveCode!\nPlease report that incident to the developers!"),
                        HttpStatusCode.BadRequest => RequestResult<UpdateGameResult>.Failed("The server decided to reject your savestate update!\nIf you don't know why this might have happened contact the devs!"),
                        HttpStatusCode.Conflict => RequestResult<UpdateGameResult>.Failed("The game is opened in another tab! Cannot override it..."),
                        HttpStatusCode.RequestTimeout => RequestResult<UpdateGameResult>.Failed("Save took too long to reach the server! Make sure your internet connection is stable."),
                        HttpStatusCode.TooManyRequests => RequestResult<UpdateGameResult>.Failed("Trying to save too fast. Try again in 5 seconds. No progress is lost ignoring this message!"),
                        _ => RequestResult<UpdateGameResult>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}")
                    })
                    : RequestResult<UpdateGameResult>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<UpdateGameResult>.Error(ex);
            }
        }

        public async Task<RequestResult<Guid>> ActivateStateAsync(Guid stateId)
        {
            try
            {
                var response = await Backend.ActivateStateAsync(stateId);

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        HttpStatusCode.NotFound => RequestResult<Guid>.Failed("Invalid Savecode"),
                        _ => RequestResult<Guid>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}"),
                    })
                    : RequestResult<Guid>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<Guid>.Error(ex);
            }
        }

        public async Task<RequestResult<Article[]>> GetLatestNewsAsync()
        {
            try
            {
                var response = await Backend.GetLatestNewsAsync();

                return !response.IsSuccessStatusCode
                    ? (response.StatusCode switch
                    {
                        _ => RequestResult<Article[]>.Failed($"An unknown error occured!\nTry again...\nIf it persists ask the devs. Code:{response.StatusCode}"),
                    })
                    : RequestResult<Article[]>.Successful(response.Result);
            }
            catch (Exception ex)
            {
                return RequestResult<Article[]>.Error(ex);
            }
        }
    }
}