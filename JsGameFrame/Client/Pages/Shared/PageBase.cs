using Microsoft.AspNetCore.Components;

namespace Idlebar.Client.Pages
{
    public abstract class PageBase : ComponentBase
    {
        [Parameter]
        public bool IsShown { get; set; } = false;

        public string Class => IsShown
            ? ""
            : "g_hidden";
    }
}
