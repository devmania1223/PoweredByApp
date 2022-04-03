import { LiiingoContentType } from '@liiingo/core-api-client-typescript';
import mongoose, { Document, Schema } from 'mongoose';
import { ModelWithTimestamps } from '../modeltypes';

export const ContentSchema = new Schema({
  liiingoContentId: String,
  liiingoContentType: {
    type: String,
    enum: ['webview', 'text', 'image', 'video'],
  },
  languages: {
    type: Schema.Types.Mixed,
  },
});

export interface ContentModel extends Document<string>, ModelWithTimestamps {
  liiingoContentId: string;
  liiingoContentType: LiiingoContentType;
  languages: {
    LiiingoLanguage: {
      name: string;
      value: string;
      fileUrl: string;
    };
  };
}

export const Content = mongoose.model<ContentModel>('Content', ContentSchema);
