#include <stdlib.h>
#include <string.h>

bool wordPattern(char* pattern, char* str) {
    char* words[26] = {NULL};
    char* token = strtok(str, " ");
    int i = 0;

    while (token != NULL) {
        if (pattern[i] == '\0')
            return false;

        int index = pattern[i] - 'a';
        if (words[index] == NULL) {
            for (int j = 0; j < 26; j++) {
                if (words[j] && strcmp(words[j], token) == 0)
                    return false;
            }
            words[index] = token;
        } else if (strcmp(words[index], token) != 0)
            return false;

        token = strtok(NULL, " ");
        i++;
    }

    return pattern[i] == '\0';
}
