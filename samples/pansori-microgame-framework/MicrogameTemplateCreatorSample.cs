using System.IO;
using UnityEditor;
using UnityEngine;

namespace PortfolioSamples.PansoriMicrogame.Editor
{
    /// <summary>
    /// 신규 미니게임 폴더와 기본 manager script를 생성하는 공개용 Editor Tool 샘플입니다.
    /// </summary>
    public static class MicrogameTemplateCreatorSample
    {
        private const string Root = "Assets/Microgames";

        [MenuItem("Tools/Portfolio Samples/Create Microgame Template")]
        public static void CreateTemplate()
        {
            string gameName = "NewMicrogame";
            string folder = $"{Root}/{gameName}";

            Directory.CreateDirectory(folder);
            File.WriteAllText($"{folder}/{gameName}Manager.cs", BuildManagerScript(gameName));
            AssetDatabase.Refresh();

            Debug.Log($"Microgame template created: {folder}");
        }

        private static string BuildManagerScript(string gameName)
        {
            return $@"using PortfolioSamples.PansoriMicrogame;
using UnityEngine;

public sealed class {gameName}Manager : MicrogameBase
{{
    public override string GameName => ""{gameName}"";

    public override void StartGame(MicrogameContext context)
    {{
        base.StartGame(context);
        // TODO: initialize rule, input, timer, UI
    }}

    private void Update()
    {{
        // TODO: check success/fail condition
        // ReportResult(success: true);
    }}
}}
";
        }
    }
}
