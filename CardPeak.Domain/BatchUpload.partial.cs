using System.IO;

namespace CardPeak.Domain
{
    public partial class BatchUpload
    {
        /// <summary>
        /// Identifier Length is computed by the length of GUID + 1.
        /// Length of a GUID is a constant 36 characters.
        /// </summary>
        public string OriginalFileName
        {
            get
            {
                try
                {
                    if (string.IsNullOrEmpty(this.FileName))
                    {
                        return string.Empty;
                    }

                    var identifierLength = 37;
                    var file = Path.GetFileNameWithoutExtension(this.FileName);
                    var fileExtension = Path.GetExtension(this.FileName);

                    return file.Remove(file.Length - identifierLength, identifierLength) + 
                        fileExtension;
                }
                catch
                {
                    return Path.GetFileName(this.FileName);
                }
            }
        }
    }
}